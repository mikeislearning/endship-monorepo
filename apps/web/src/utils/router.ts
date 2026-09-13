import { AnyRouteMatch, createRouter, redirect } from "@tanstack/react-router";
import { t, TOptions } from "i18next";

import { ActionsType, DBTablesType, UserRoleType } from "@libs/authorization";
import { I18nKeyType } from "@/i18n";
import { routeTree } from "@/routeTree.gen";

import { hasPermission } from "./authorization";
import { envVariables } from "./envVariables";

export type RouterContextType = {
  isAuthenticated?: boolean;
  userRole: UserRoleType | null;
  userId: string | null;
};

export const routerInstance = createRouter({
  routeTree,
  context: {
    isAuthenticated: undefined,
    userRole: null,
    userId: null,
  },
});

const getHeaderTitlePrefix = () => {
  const env = envVariables.VITE_ENVIRONMENT;
  switch (env) {
    default:
      return "Mindsea Template";
  }
};

export const headWithCustomTitle = (
  i18nKey: I18nKeyType,
  i18nKeyOptions?: TOptions,
): {
  links?: AnyRouteMatch["links"];
  scripts?: AnyRouteMatch["headScripts"];
  meta?: AnyRouteMatch["meta"];
} => {
  const title = t(i18nKey, i18nKeyOptions);

  return {
    meta: [
      {
        title: `${title} | ${getHeaderTitlePrefix()}`,
      },
    ],
  };
};

export const validateRoutePermission = ({
  context,
  action,
  subject,
  subjectResource,
}: {
  context: RouterContextType;
  action: ActionsType;
  subject: DBTablesType;
  subjectResource?: object;
}) => {
  if (
    context.userRole &&
    !hasPermission({
      action,
      subject,
      subjectResource,
      ...context,
    })
  ) {
    throw redirect({
      to: "/",
    });
  }
};
