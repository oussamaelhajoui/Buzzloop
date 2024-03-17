type Tweet = {
  text: string;
};

const fetchTweets = async (): Promise<Tweet[]> => {
  const res = await fetch("http://localhost:8080/api/tweets", {
    next: { revalidate: 5 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tweets");
  }

  return res.json();
};

export default async function Home() {
  const tweets = await fetchTweets();

  return (
    <div>
      {tweets.map((tweet) => (
        <div key={tweet.text}>{tweet.text}</div>
      ))}
    </div>
  );
}