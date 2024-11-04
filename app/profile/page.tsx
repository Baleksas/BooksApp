import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
export default async function Profile() {
  "use server";
  const session = await getSession();
  const user = session?.user;

  console.log(user);
  return (
    user && (
      <div>
        <Image src={user.picture} alt={user.name} width={100} height={500} />
        <h2>Name: {user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
}
