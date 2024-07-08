import Timeline from "@/components/presentational/organisms/Timeline";
import { Provider, RecoilProvider } from "../context/providers";

export default function Home() {
  return (
    <Provider>
      <Timeline />
    </Provider>
  );
}
