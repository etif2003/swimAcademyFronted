import SchoolListCard from "./SchoolListCard";

export default function SchoolsList({
  title,
  schools,
  onApprove,
  onUnlink,
  approvingId,
}) {
  if (!schools.length) return null;

  return (
    <div>

      {schools.map((item) => (
        <SchoolListCard
          key={item._id}
          item={item}
          onApprove={onApprove}
          onUnlink={onUnlink}
          approvingId={approvingId}
        />
      ))}
    </div>
  );
}