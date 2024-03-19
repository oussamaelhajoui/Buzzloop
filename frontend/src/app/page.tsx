"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateBuzzForm from "@/components/CreateBuzzForm";
import {
  Heart,
  Repeat2,
  Share2,
  Trash2,
  Edit2,
  MoreVertical,
} from "lucide-react";

interface Buzz {
  id: string;
  content: string;
  createdAt: string;
  author: string | null;
}

const fetchBuzzes = async (): Promise<Buzz[]> => {
  const res = await fetch("http://localhost:8080/api/buzz", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch buzzes");
  }

  return res.json();
};

export default function Home() {
  const [buzzes, setBuzzes] = useState<Buzz[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedBuzz, setSelectedBuzz] = useState<Buzz | null>(null);
  const [likeClicked, setLikeClicked] = useState<boolean>(false);
  const [rebuzzClicked, setRebuzzClicked] = useState<boolean>(false);

  useEffect(() => {
    const loadBuzzes = async () => {
      try {
        const fetchedBuzzes = await fetchBuzzes();
        setBuzzes(fetchedBuzzes);
      } catch (error) {
        console.error("Error fetching buzzes:", error);
      }
    };

    loadBuzzes();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto flex space-x-4">
      <div className="flex-1 space-y-4">
        {buzzes.map((buzz) => (
          <div key={buzz.id} className="mb-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{buzz.content}</CardTitle>
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowMenu(!showMenu);
                        setSelectedBuzz(buzz);
                      }}
                      className="focus:outline-none"
                    >
                      <MoreVertical />
                    </button>
                    {showMenu && selectedBuzz === buzz && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                        <div className="py-1">
                          <button
                            className="w-full flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => console.log("Edit buzz:", buzz)}
                          >
                            <Edit2 className="mr-2" /> Edit Buzz
                          </button>
                          <button
                            className="w-full flex justify-start px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                            onClick={() => console.log("Delete buzz:", buzz)}
                          >
                            <Trash2 className="mr-2" /> Delete Buzz
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Created at: {formatDate(buzz.createdAt)}
                </CardDescription>
                <CardDescription>
                  Author: {buzz.author || "Anonymous"}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-around  items-center border-t border-gray-800 pt-4 px-4">
                <button
                  onClick={() => setLikeClicked(!likeClicked)}
                  style={{ color: likeClicked ? "red" : "white" }}
                >
                  <Heart />
                </button>
                <button
                  onClick={() => setRebuzzClicked(!rebuzzClicked)}
                  style={{ color: rebuzzClicked ? "blue" : "white" }}
                >
                  <Repeat2 />
                </button>
                <button onClick={() => console.log("Shared")}>
                  <Share2 />
                </button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Create Buzz</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateBuzzForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
