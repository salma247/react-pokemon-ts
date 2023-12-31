import { Skeleton } from "@mui/material";

type Props = {
  style: any;
};
function SkeletonCard({ style }: Props) {
  return (
    <div style={{ ...style, width: 330, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex" }}>
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          style={{ marginRight: 16 }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Skeleton variant="text" width={200} height={15} />
          <Skeleton variant="text" width={200} height={15} />
          <Skeleton variant="text" width={200} height={15} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
