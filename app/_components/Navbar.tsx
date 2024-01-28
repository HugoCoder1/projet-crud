import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="max-w-4xl mx-auto p-3">
    
      <nav className="flex items-center justify-around">
        <div>
            <Link href="/">Acceuil</Link>
           
        </div>
        <div>
        <Link href="/ajouter">Ajouter</Link>
        </div>
      </nav>
    </div>
  );
}
