"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Editer({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/post/${id}`);
        const data = await res.json();
        setNom(data.nom);
        setPrenom(data.prenom);
        setSexe(data.sexe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchpost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom, prenom, sexe }),
      });
      setTimeout(() => {
        setLoading(false);
        router.push("/");
        toast.success("Modification effectuée avec succès");
      }, 1000);
    } catch (error) {
      toast.error("Update Error");
    }
  };
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-4 p-5">
        <h1 className="text-2xl">Modifier votre post</h1>
        <form onSubmit={handleUpdate}>
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
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Veuillez patienter
              </>
            ) : (
              "Modifier"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
