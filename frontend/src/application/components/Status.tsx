export default function Status (props: { status: string | undefined }) {
  const statusColor = (status: string | undefined) => {
    switch (status) {
      case "OPEN":
        return "bg-green-400";
      case "upcoming":
        return "bg-yellow-400";
      case "finished":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  }
  
  return (
    <label class={`p-4 shadow-xl rounded-lg h-min ${statusColor(props.status)}`}>
      {props.status}
    </label>
  )
}
