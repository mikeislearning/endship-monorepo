import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

import { FullLogo } from "@/blocks/FullLogo";
import { AwButton } from "@/components/AwButton/AwButton";
import { AwCard, AwCardContent, AwCardTitle } from "@/components/AwCard";
import { AwText } from "@/components/AwText/AwText";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="-mt-6 grid w-sm gap-6">
        <AwCard className="w-sm">
          <FullLogo className="mx-20" />
          <AwCardContent className="grid gap-1">
            <AwCardTitle>
              <AwText variant="headerOne" i18nKey="web:login.title" />
            </AwCardTitle>
            <div className="pt-12 pb-16 italic">
              <AwText
                className="text-center text-muted-foreground"
                i18nKey="web:login.subtitle"
              />
            </div>
            <Link to="/sandbox">
              <AwButton
                asButtonElement={false}
                variant="outline"
                i18nKey="web:goToSandbox"
                className="w-full"
                iconComponent={<ArrowRightIcon />}
                iconPosition="right"
              />
            </Link>
          </AwCardContent>
        </AwCard>
      </div>
    </div>
  );
};
