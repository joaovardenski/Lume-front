import { useContext } from "react";
import { AuthContext } from "../../authentication/contexts/AuthContext";
import lumeIcon from "../../../assets/lumeLogo.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-accent px-4">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center text-center gap-4">
        <img src={lumeIcon} alt="Lume logo" className="w-28 mb-2 opacity-90" />

        <h1 className="text-6xl font-extrabold text-primary">404</h1>

        <h2 className="text-2xl font-bold text-gray-800">
          Página não encontrada
        </h2>

        <p className="text-gray-600">
          A página que você tentou acessar não existe ou foi movida.
        </p>

        <Link
          to={isAuthenticated ? "/my-day" : "/"}
          className="mt-4 w-full py-3 bg-primary text-white font-semibold rounded-xl
                     hover:bg-primary/90 transition"
        >
          Voltar para o início
        </Link>
      </section>
    </div>
  );
}
