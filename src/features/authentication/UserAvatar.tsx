import { useUser } from "./hooks/useUser";

function UserAvatar() {
  const { user } = useUser();
  const fullName = user?.user_metadata?.fullName || "Guest";
  const avatar = user?.user_metadata?.avatar || "default-user.jpg";

  return (
    <div className="flex gap-5 items-center font-medium text-[1.4rem] text-grey-600">
      <img
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block w-14 aspect-square object-cover object-center rounded-full  outline-2 outline-grey-100"
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
