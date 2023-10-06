export const metadata = {
  title: "React Assessment",
};

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-10 px-10">{children}</div>;
};

export default UsersLayout;
