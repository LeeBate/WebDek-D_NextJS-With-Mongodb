import Link from 'next/link'
import Cookies from 'js-cookie'
import { MouseEvent, useCallback, useEffect, useState } from 'react'
import { Container } from '../../layouts/PublicLayout'

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true'
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true)

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true'
    setCookieConsentIsTrue(consentIsTrue)
  }, [])

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      })
      setCookieConsentIsTrue(true)
    }
  }

  if (cookieConsentIsTrue) {
    return null
  }

  return (
    <section className="fixed bottom-0 left-0 w-full py-2 md:py-4">
      ...
    </section>
  )
}

export default CookieConsent