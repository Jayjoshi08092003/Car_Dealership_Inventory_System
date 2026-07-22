function StockBadge({ quantity }) {

    if (quantity === 0)
        return (
            <span className="rounded-full bg-red-500/20 px-3 py-1 text-red-400">
                Out of Stock
            </span>
        );

    if (quantity <= 5)
        return (
            <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
                Low Stock
            </span>
        );

    return (
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
            Available
        </span>
    );
}

export default StockBadge;