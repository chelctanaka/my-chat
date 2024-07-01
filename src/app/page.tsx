import Timeline from "@/components/my/timeline";
import { Provider, RecoilProvider } from "../context/providers";

export default function Home() {
  return (
    <Provider>
      <Timeline />
    </Provider>
  );
}
