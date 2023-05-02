

export default function EmptyState() {
    return (
        <section className="py-4 bg-neutral-50 overflow-hidden min-h-[300px] pt-[130px]">
            <div className="container px-4 mx-auto ">
                <div className="max-w-lg mx-auto text-center">
                    <h2 className="font-heading mb-3 text-2xl text-secondary font-semibold">
                        Oops..
                    </h2>
                    <p className="mb-7 text-neutral-500">
                        Buku yang kalian cari tidak ada, <br /> Pastikan anda telah memasukkan kata kunci atau URL yang tepat
                    </p>
                </div>
            </div>
        </section>

    )
}
