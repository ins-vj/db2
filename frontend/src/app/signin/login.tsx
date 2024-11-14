"use client";
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetchAccessToken } from "@/helpers/api";



export default function page() {

  const { user, isLoading } = useUser();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchTokens = async () => {
      if (user) {
        try {
          const data = await fetchAccessToken(user);

          if (data.accessToken) {
            setAccessToken(data.accessToken);
            setIdToken(data.idToken);
            console.log("Access Token:", data.accessToken);
            console.log("Access Token2", data);
          } else {
            console.error("No access token found in response data:", data);
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };

    fetchTokens(); // Call the async function inside useEffect
  }, [user]); 

const onSubmit = async (e: React.FormEvent) => {

}


  return (
  <div className='border rounded bg-black bg-opacity-20 absolute top-[30vh] left-[70vw] z-10 h-[20vh] text-white w-[20vw]'>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Id Token: {accessToken || "Token not available"}</p>
          <a href="/api/auth/logout" className="btn btn-primary btn-margin">
            Log out
          </a>
        </div>
      ) : (
        <div className='flex flex-col items-center w-2/3 z-10'>
          LOG IN <br/>
<form action="submit" className='flex flex-col'>
  <p className='mt-3'>e-mail:</p>
  <input type="text" placeholder="email" name="email" id="email" />
  <p className='mt-5'>password:</p>
  <input type="password" placeholder="password" name="password" id="password" />
  <input type="submit" value="Login" className='btn btn-primary mb-10 mt-3' />
</form>

        <a href="/api/auth/login" className="btn btn-primary btn-margin">
          Log in using gmail
        </a>
        </div>
      )}
    </div>
  );
};
