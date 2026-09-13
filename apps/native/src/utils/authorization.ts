import {
  abilities,
  ActionsType,
  DBTablesType,
  parseSubjectResource,
  UserRoleType,
} from "@libs/authorization";

export const hasPermission = ({
  userId,
  userRole,
  action,
  subject,
  subjectResource,
}: {
  userId: string | null;
  userRole: UserRoleType;
  action: ActionsType;
  subject: DBTablesType;
  subjectResource?: object;
}) => {
  return abilities({
    userId: userId ?? "",
    userRole,
  }).can(action, parseSubjectResource({ subject, subjectResource }));
};
