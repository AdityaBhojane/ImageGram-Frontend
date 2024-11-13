import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../logout/LogoutButton";
import AvatarLogo from "../avatar/AvatarLogo";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  console.log(isMenuOpen);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <h2 className="text-xl font-bold">ImageGram</h2>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem isActive>
          <p
            onClick={() => navigate("/")}
            className="cursor-pointer"
            color="foreground"
            aria-current="page"
          >
            Post Feed
          </p>
        </NavbarItem>
        {token? 
        <>
        <NavbarItem>
          <p
            onClick={() => navigate("/create-post")}
            className="cursor-pointer"
            color="foreground"
          >
            Create Post
          </p>
        </NavbarItem>
        <NavbarItem>
          <p
            onClick={() => navigate("/user-post")}
            className="cursor-pointer"
            color="foreground"
          >
            Your Post
          </p>
        </NavbarItem>
        </>:
        <>
        </>}
      </NavbarContent>
      <NavbarContent justify="end">
        {token ? (
          <> 
            
            <LogoutButton />
            <AvatarLogo />
          </>
        ) : (
          <>
            <NavbarItem className=" lg:flex">
              <p onClick={() => navigate("/signin")} className="cursor-pointer">
                Signin
              </p>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="primary"
                onClick={() => navigate("/signup")}
                className="cursor-pointer"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>{" "}
          </>
        )}
      </NavbarContent>
      <NavbarMenu className="max-w-[200px]">
        <NavbarMenuItem>
          <div className="flex flex-col gap-3">
            <span
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer"
              color="foreground"
              aria-current="page"
            >
              Post Feed
            </span>
            {token ? 
            <>
            <span
              onClick={() => {
                navigate("/create-post");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer"
              color="foreground"
            >
              Create Post
            </span>
             <span
              onClick={() => {
                navigate("/user-post");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer"
              color="foreground"
            >
              Your Post
            </span>
            </> : 
            <>
            <span
              onClick={() => {
                navigate("/signin");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-blue-500"
              color="foreground"
            >
              signin
            </span>
            <span
              onClick={() => {
                navigate("/signup");
                setIsMenuOpen(false);
              }}
              className="cursor-pointer text-blue-600"
              color="foreground"
            >
              signup
            </span>
            </>}
          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
