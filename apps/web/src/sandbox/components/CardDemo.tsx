import { BathIcon, BedIcon, LandPlotIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { AwBadge } from "@/components/AwBadge/AwBadge";
import { AwButton } from "@/components/AwButton/AwButton";
import {
  AwCard,
  AwCardContent,
  AwCardDescription,
  AwCardFooter,
  AwCardHeader,
  AwCardTitle,
} from "@/components/AwCard";
import { AwForm } from "@/components/AwForm";
import { AwLabel } from "@/components/AwLabel";
import { AwText } from "@/components/AwText/AwText";
import { AwTextInput } from "@/components/AwTextInput/AwTextInput";
import { appLogger } from "@/utils/logger";

export const CardDemo = () => {
  const form = useForm();

  return (
    <div className="flex flex-col items-start gap-4">
      <AwCard className="w-full max-w-sm">
        <AwCardHeader>
          <AwCardTitle i18nKey="sandbox:card.login.title" />
          <AwCardDescription i18nKey="sandbox:card.login.description" />
        </AwCardHeader>
        <AwCardContent>
          <AwForm
            form={form}
            onSubmit={values => {
              appLogger.debug("values", values);
            }}>
            <AwTextInput
              name="email"
              control={form.control}
              labelI18nKey="sandbox:card.login.emailLabel"
              placeholderI18nKey="sandbox:card.login.emailPlaceholder"
              required
            />
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <AwLabel
                  htmlFor="password"
                  i18nKey="sandbox:card.login.passwordLabel"
                />
                <a className="ml-auto inline-block underline-offset-4 hover:underline">
                  <AwText
                    as="span"
                    i18nKey="sandbox:card.login.forgotPassword"
                  />
                </a>
              </div>
              <AwTextInput
                name="password"
                control={form.control}
                type="password"
                required
              />
            </div>
          </AwForm>
        </AwCardContent>
        <AwCardFooter className="flex-col gap-2">
          <AwButton
            type="submit"
            className="w-full"
            i18nKey="sandbox:card.login.cta"
          />
          <AwButton
            variant="outline"
            className="w-full"
            i18nKey="sandbox:card.login.ctaGoogle"
          />
          <AwText
            className="mt-4 text-center"
            i18nKey="sandbox:card.login.noAccount"
            i18nProps={{
              components: {
                a: <a className="underline underline-offset-4" />,
              },
            }}
          />
        </AwCardFooter>
      </AwCard>
      <AwCard>
        <AwCardHeader>
          <AwCardTitle i18nKey="sandbox:card.meetingNotes.title" />
          <AwCardDescription i18nKey="sandbox:card.meetingNotes.description" />
        </AwCardHeader>
        <AwCardContent>
          <AwText>
            Client requested dashboard redesign with focus on mobile
            responsiveness.
          </AwText>
          <ol className="mt-4 flex list-decimal flex-col gap-2 pl-6">
            <AwText as="li">
              New analytics widgets for daily/weekly metrics
            </AwText>
            <AwText as="li">Simplified navigation menu</AwText>
            <AwText as="li">Dark mode support</AwText>
            <AwText as="li">Timeline: 6 weeks</AwText>
            <AwText as="li">
              Follow-up meeting scheduled for next Tuesday
            </AwText>
          </ol>
        </AwCardContent>
      </AwCard>
      <AwCard>
        <AwCardHeader>
          <AwCardTitle i18nKey="sandbox:card.image.title" />
          <AwCardDescription i18nKey="sandbox:card.image.description" />
        </AwCardHeader>
        <AwCardContent className="px-0">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            className="aspect-video object-cover"
            width={500}
            height={500}
          />
        </AwCardContent>
        <AwCardFooter className="flex items-center gap-2">
          <AwBadge variant="outline">
            <BedIcon /> 4
          </AwBadge>
          <AwBadge variant="outline">
            <BathIcon /> 2
          </AwBadge>
          <AwBadge variant="outline">
            <LandPlotIcon /> 350m²
          </AwBadge>
          <AwText variant="mdMedium" className="ml-auto tabular-nums">
            $135,000
          </AwText>
        </AwCardFooter>
      </AwCard>
      <div className="flex w-full flex-wrap items-start gap-8 md:*:data-[slot=card]:basis-1/4">
        <AwCard>
          <AwCardContent>
            <AwText i18nKey="sandbox:card.meta.contentOnly" />
          </AwCardContent>
        </AwCard>
        <AwCard>
          <AwCardHeader>
            <AwCardTitle i18nKey="sandbox:card.meta.headerOnlyTitle" />
            <AwCardDescription i18nKey="sandbox:card.meta.headerOnlyDescription" />
          </AwCardHeader>
        </AwCard>
        <AwCard>
          <AwCardHeader>
            <AwCardTitle i18nKey="sandbox:card.meta.headerAndContentTitle" />
            <AwCardDescription i18nKey="sandbox:card.meta.headerAndContentDescription" />
          </AwCardHeader>
          <AwCardContent>
            <AwText i18nKey="sandbox:card.meta.content" />
          </AwCardContent>
        </AwCard>
        <AwCard>
          <AwCardFooter>
            <AwText i18nKey="sandbox:card.meta.footerOnly" />
          </AwCardFooter>
        </AwCard>
        <AwCard>
          <AwCardHeader>
            <AwCardTitle i18nKey="sandbox:card.meta.headerAndFooterTitle" />
            <AwCardDescription i18nKey="sandbox:card.meta.headerAndFooterDescription" />
          </AwCardHeader>
          <AwCardFooter>
            <AwText i18nKey="sandbox:card.meta.footer" />
          </AwCardFooter>
        </AwCard>
        <AwCard>
          <AwCardContent>
            <AwText i18nKey="sandbox:card.meta.content" />
          </AwCardContent>
          <AwCardFooter>
            <AwText i18nKey="sandbox:card.meta.footer" />
          </AwCardFooter>
        </AwCard>
        <AwCard>
          <AwCardHeader>
            <AwCardTitle i18nKey="sandbox:card.meta.headerContentAndFooterTitle" />
            <AwCardDescription i18nKey="sandbox:card.meta.headerContentAndFooterDescription" />
          </AwCardHeader>
          <AwCardContent>
            <AwText i18nKey="sandbox:card.meta.content" />
          </AwCardContent>
          <AwCardFooter>
            <AwText i18nKey="sandbox:card.meta.footer" />
          </AwCardFooter>
        </AwCard>
      </div>
    </div>
  );
};
