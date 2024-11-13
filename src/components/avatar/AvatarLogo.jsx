import {Avatar} from "@nextui-org/react";

export default function AvatarLogo() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar showFallback src='https://images.unsplash.com/broken' />
    </div>
  );
}