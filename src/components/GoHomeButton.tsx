import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

const GoHomeButton = () => {
  return (
    <Button asChild variant="outline" className="absolute top-4 left-4">
      <Link to="/">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  );
};

export default GoHomeButton;