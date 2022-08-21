type NavLinkProps = {
  active?: boolean;
  title: string | React.ReactNode;
};

export const NavLink: React.FC<NavLinkProps> = ({ active, title }) => {
  return active ? (
    <li className="flex items-center flex-col">
      <span className="font-semibold text-blue-700 ">{title}</span>
      <span className="font-semibold text-blue-700 text-2xl -mt-2">•</span>
    </li>
  ) : (
    <li className="flex items-center">
      <a className="font-semibold text-gray-300 cursor-pointer transition-colors hover:text-blue-400">
        {title}
      </a>
    </li>
  );
};
