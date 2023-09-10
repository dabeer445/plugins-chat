import React from "react";

const NOT_A_USER = "Please Buy this plugin!";
const DONT_HAVE_PLUGIN = "You havent bought this plugin!";

export interface AuthenticationProps {
  authenticated: { isUser: boolean; plugins: string[] };
  plugin_name: string;
  children: React.ReactNode;
}
export const Authentication: React.FC<AuthenticationProps> = ({
  authenticated,
  children,
  plugin_name,
}) => {
  if (!authenticated.isUser) {
    return <>{NOT_A_USER}</>;
  }
  if (authenticated.plugins.indexOf(plugin_name) == -1) {
    return <>{DONT_HAVE_PLUGIN}</>;
  }
  return <>{children}</>;
};
