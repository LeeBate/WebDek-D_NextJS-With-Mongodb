import Cookies from "js-cookie";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { Container } from "../layouts/PublicLayout";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE =
  new Date().getTime() + 365 * 24 * 60 * 60;

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };


  if (cookieConsentIsTrue) {
    return null;
  }

  console.log("cookieConsentIsTrue", cookieConsentIsTrue);

  return (
    <section className="fixed bottom-0 left-0 w-full py-2 md:py-4">
      <Container>
        <div className="flex flex-col items-start px-5 py-3 space-y-2 bg-gray-200 md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
          <div className="flex items-center flex-grow text-gray-900">
            <p className="text-md font-bold">
              เว็บไซต์ของเรามีการเก็บ cookies
              ซึ่งเก็บข้อมูลว่าคุณใช้งานเว็บไซต์ของเราอย่างไรและช่วยให้เราจดจำคุณได้
              เราใช้ข้อมูลนี้เพื่อทำให้ประสบการณ์การใช้เว็บไซต์ดียิ่งขึ้น
              
              
              {/* <Link href="/privacy-policy">
               
                <span className=" underline decoration-[#1a237e]">
                Privace Policy
              </span>{" "}
              </Link> */}
              .
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="p-3 text-sm font-bold text-white uppercase bg-[#1a237e] whitespace-nowrap"
              onClick={onClick}
            >
              ยอมรับ
            </button>
          
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CookieConsent;
