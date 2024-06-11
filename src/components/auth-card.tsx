import { FC, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

const AuthCard: FC<Props> = ({ title, description, children }: Props) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Separator />
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
