import lumeIcon from "../../../assets/lumeLogo.png";
import { Link } from "react-router-dom";

export default function NotAuthenticated() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-accent px-4">
      <section className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center text-center gap-4">
        <img src={lumeIcon} alt="Lume logo" className="w-32 mb-2" />

        <h1 className="text-3xl font-bold text-primary">
          You are not authenticated
        </h1>

        <p className="text-gray-600">Login and continue to access Lume!</p>

        <Link
          to="/"
          className="mt-4 w-full py-3 bg-primary text-white font-semibold rounded-xl
                     hover:bg-primary/90 focus:outline-none focus:ring-2
                     focus:ring-primary/40 transition"
        >
          Go to login
        </Link>
      </section>
    </div>
  );
}
