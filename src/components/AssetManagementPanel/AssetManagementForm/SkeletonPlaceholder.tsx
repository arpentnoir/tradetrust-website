import React from "react";
import { LoaderSkeleton } from "../../UI/Loader";

export const SkeletonPlaceholder = () => {
  return (
    <div className="mt-4 mb-6" data-testid="loading-skeleton-placeholder">
      <LoaderSkeleton className="mb-2" width="90px" />
      <LoaderSkeleton />
    </div>
  );
};
