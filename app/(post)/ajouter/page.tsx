"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Ajouter() {
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [isloading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, prenom, sexe }),
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/");
        toast.success("Element ajouter avec succès");
      }, 1000);
    } catch (error) {
      toast.error("Erreur d'ajout")
    }
  };
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-4 p-5">
        <h1 className="text-2xl">Ajouter un nouvel post</h1>
        <form onSubmit={handleSubmit}>
          <Label>Nom</Label>
          <Input
            type="text"
            placeholder="Entrer votre nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <Label>Prenom</Label>
          <Input
            type="text"
            placeholder="Entrer votre prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
          <Label>SEXE</Label>
          <Input
            type="text"
            placeholder="Entrer votre sexe"
            value={sexe}
            onChange={(e) => setSexe(e.target.value)}
            required
          />
          <Button type="submit" className="mt-4">
            {isloading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Veuillez patienter
              </>
            ) : (
              "Ajouter"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
