import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function DefaultPagination({ totalPages, paginate }) {
  const [active, setActive] = React.useState(1);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => {
      setActive(index);
      paginate(index);
    },
  });

  const next = () => {
    if (active === totalPages) return;

    const nextPage = active + 1;
    setActive(nextPage);
    paginate(nextPage);
  };

  const prev = () => {
    if (active === 1) return;

    const prevPage = active - 1;
    setActive(prevPage);
    paginate(prevPage);
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ChevronLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array(totalPages).fill().map((_, index) => (
          <IconButton {...getItemProps(index + 1)}>{index + 1}</IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        Next
        <ChevronRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}