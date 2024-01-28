"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DATA {
  id: string;
  nom: string;
  prenom: string;
  sexe: string;
}

export default function Affichage() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const Fetchdata = async () => {
      const res = await fetch("http://localhost:3000/api/post");
      const data = await res.json();
      setData(data);
    };
    Fetchdata();
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });

      toast.success("Vous avez supprimer un élement avec succès");
      router.refresh();
    } catch (error) {
      toast.error("Erreur de suppression");
    }
  };

  return (
    <div className="max-4xl mx-auto p-2 w-full">
      <div className="grid grid-cols-4 gap-10">
        {data?.map((dat: DATA) => (
          <Card key={dat.id}>
            <CardHeader>
              <CardTitle>{dat.nom}</CardTitle>
              <CardDescription>{dat.prenom}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{dat.sexe}</p>
            </CardContent>
            <CardFooter>
              <p className="space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => router.push(`/${dat.id}`)}
                >
                  Editer
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(dat.id)}
                >
                  Supprimer
                </Button>
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
