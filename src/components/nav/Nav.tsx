import { NavLink } from "./NavLink";
import { ChevronDown } from "tabler-icons-react";

type NavProps = {
  activePage:
    | "home"
    | "bestseller"
    | "category"
    | "find-store"
    | "blog"
    | "none";
};

export const Nav: React.FC<NavProps> = ({ activePage }) => {
  return (
    <nav>
      <ul className="flex justify-center items-start gap-10 mt-4">
        <NavLink active={activePage === "home"} title="Home" />
        <NavLink active={activePage === "bestseller"} title="Bestseller" />
        <NavLink
          active={activePage === "category"}
          title={
            <div className="flex items-center">
              Category <ChevronDown size={18} className="ml-2" />
            </div>
          }
        />
        <NavLink active={activePage === "find-store"} title="Find a store" />
        <NavLink active={activePage === "blog"} title="Blog" />
      </ul>
    </nav>
  );
};
