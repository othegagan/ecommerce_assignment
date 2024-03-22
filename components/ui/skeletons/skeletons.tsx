export const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-black/10 before:to-transparent`;

export function CardSkeleton() {
    return (
        <div className=' flex max-w-lg flex-col gap-2 '>
            <div className={`h-5 w-[60%] mb-6 rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
            <div className={`h-8 w-full rounded-md bg-neutral-200 ${shimmer}`} />
        </div>
    );
}
