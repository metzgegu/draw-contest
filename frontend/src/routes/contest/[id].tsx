import { useParams } from "solid-start";
import Contest from "~/application/pages/Contest";

export default function contest() {
  const params = useParams();

  return <Contest id={params.id} />;
}
