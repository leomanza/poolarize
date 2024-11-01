import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <>
      <p>
        This app demonstrates a key element of NEAR’s UX: once an app has
        permission to make calls on behalf of a user (that is, once a user signs
        in), the app can make calls to the blockchain for them without prompting
        extra confirmation. So you’ll see that if you don’t include a donation,
        your message gets posted right to the guest book.
      </p>
      <br />
      <p>
        But, if you do add a donation, then NEAR will double-check that you’re
        ok with sending money to this app.
      </p>
      <br />
      <p>
        Go ahead and{" "}
        <Button asChild>
          <Link to="/login">sign in</Link>
        </Button>{" "}
        to try it out!
      </p>
    </>
  );
}
