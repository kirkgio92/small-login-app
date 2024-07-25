import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProtectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();
        if (!session) {
          router.push("/signIn");
        } else {
          setLoading(false);
        }
      };

      checkSession();
    }, [router]);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default ProtectedRoute;
