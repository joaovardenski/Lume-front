interface LinkAuthProps {
  link: string;
  text: string;
}

export default function LinkAuth({ link, text }: LinkAuthProps) {
  return (
    <a
      href={link}
      className="text-sm text-secondary hover:underline hover:text-secondary/80"
    >
      {text}
    </a>
  );
}
