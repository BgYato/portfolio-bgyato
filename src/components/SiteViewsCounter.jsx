import { useEffect, useState } from "react";

const API_URL = "https://siteviews.vercel.app/api/count";
const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1000;
const VISITED_KEY =
  "!X?vtl0:`r#wekY{}03S4`5>==/?s@9D$;VK4<ra<7B|Qj;vz5oU&O|P:5ffpLr0";
const VISITED_VALUE =
  "+zX+t0O/BHsC~(.{y+)){7Y7Y|1>LFfhq(RIRgh>n=&9Ww.W@J-LbpV$0DYb1m[>";

function isLocalhost() {
  return ["127.0.0.1", "localhost"].includes(window.location.hostname);
}

async function getIpInfo() {
  try {
    const response = await fetch("https://json.geoiplookup.io");
    if (!response.ok) {
      throw new Error(`IP lookup failed with HTTP ${response.status}`);
    }

    const data = await response.json();
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );
  } catch (error) {
    console.warn("SiteViews Warn : Could not retrieve visitor IP info.", error);
    return {};
  }
}

function getDeviceInfo() {
  return {
    userDateTime: new Date().toLocaleString(),
    platform: navigator.platform,
    deviceMemmory: navigator.deviceMemory,
    browserCodeName: navigator.appCodeName,
    browserLanguage: navigator.language,
    browserOnline: navigator.onLine,
    browserEngine: navigator.product,
    version: navigator.appVersion,
    screenWidth: screen.width,
    screenHeight: screen.height,
  };
}

function SiteViewsCounter({ projectName, className, children, style }) {
  const [count, setCount] = useState(null);
  const local = isLocalhost();

  useEffect(() => {
    if (local) {
      return undefined;
    }

    let active = true;

    const loadCount = async () => {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
        try {
          const response = await fetch(
            `${API_URL}/${encodeURIComponent(projectName)}`,
            { method: "GET" }
          );

          if (!response.ok) {
            if (response.status >= 500 && attempt < MAX_RETRIES) {
              await new Promise((resolve) =>
                window.setTimeout(resolve, RETRY_DELAY_MS)
              );
              if (!active) return;
              continue;
            }

            throw new Error(`Count request failed with HTTP ${response.status}`);
          }

          const result = await response.json();
          const value = result?.data?.count;
          const nextCount = Number(value);
          if (value == null || !Number.isFinite(nextCount)) {
            throw new Error("SiteViews returned an invalid count.");
          }

          if (active) setCount(nextCount);
          return;
        } catch (error) {
          if (!active) return;

          const canRetry =
            attempt < MAX_RETRIES &&
            (error instanceof TypeError || error instanceof SyntaxError);
          if (canRetry) {
            await new Promise((resolve) =>
              window.setTimeout(resolve, RETRY_DELAY_MS)
            );
            if (!active) return;
            continue;
          }

          console.error("SiteViews Errr :", error);
          return;
        }
      }
    };

    const registerVisit = async () => {
      try {
        const data = {
          project: projectName,
          hostname: window.location.hostname,
          ...(await getIpInfo()),
          ...getDeviceInfo(),
        };
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        });

        if (!response.ok) {
          let message = `HTTP ${response.status}`;
          try {
            const result = await response.json();
            message = result?.message || message;
          } catch (error) {
            console.warn("SiteViews Warn : Could not read visit error response.", error);
          }
          console.warn("SiteViews Warn :", message);
        }
      } catch (error) {
        console.error("SiteViews Errr :", error);
      }
    };

    if (sessionStorage.getItem(VISITED_KEY) !== VISITED_VALUE) {
      sessionStorage.setItem(VISITED_KEY, VISITED_VALUE);
      void registerVisit();
    }

    void loadCount();

    return () => {
      active = false;
    };
  }, [local, projectName]);

  return (
    <span style={style} className={className}>
      {local ? 0 : count ?? children}
    </span>
  );
}

export default SiteViewsCounter;
