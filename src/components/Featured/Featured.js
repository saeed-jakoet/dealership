import React, {useState, useEffect, useRef} from 'react';
import {Element, Link} from 'react-scroll';
import { motion } from 'framer-motion';
import { fetchVehicles } from '../../api/vehicles';

const Featured = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const scrollerRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                setError('');
                const data = await fetchVehicles({ page: 1, pageSize: 12 });
                if (cancelled) return;
                const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
                setVehicles(items);
            } catch (e) {
                if (!cancelled) setError(e.message || 'Failed to load featured vehicles');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);


    return (
        <Link to='featured' smooth={true} duration={500}>
            <Element name='featured'>
                <section className="relative py-20 bg-gradient-to-b from-brand-gray-dark to-black">
                    <div className="mx-auto max-w-7xl px-6">
                        <header className="text-center">
                            <h2 className="section-title">Featured vehicles</h2>
                            <p className="mt-2 text-white/70">Handpicked selection updated daily</p>
                        </header>

                        <div className="mt-8 relative">
                            <div ref={scrollerRef} className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                                {loading && Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="min-w-[260px] h-64 rounded-lg bg-white/5 animate-pulse" />
                                ))}
                                {!loading && !error && vehicles.map((v, i) => (
                                    <motion.div key={i} className="min-w-[260px] snap-start rounded-xl overflow-hidden bg-white text-black shadow-card">
                                        <div className="relative h-40 bg-black">
                                            {v.imageUrls && v.imageUrls.length > 0 ? (
                                                <img src={v.imageUrls[0]} alt={v.name || 'Vehicle'} className="h-full w-full object-cover opacity-90" />
                                            ) : (
                                                <div className="h-full w-full grid place-items-center text-white/60">No image</div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>
                                        <div className="p-4">
                                            <p className="font-bold">{v.name}</p>
                                            <p className="text-brand-red font-semibold">{v.price ? `${v.price.toLocaleString()}` : 'Price on request'}</p>
                                        </div>
                                    </motion.div>
                                ))}
                                {error && (
                                    <div className="text-red-400">{error}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </Element>
        </Link>
    );
};

export default Featured;
