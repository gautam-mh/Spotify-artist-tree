import { motion } from 'framer-motion'

const shimmerStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transform: 'translateX(-100%)',
}

const LoadingAlbum = () => (
    <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
        <div style={{
            width: '4rem',
            height: '4rem',
            borderRadius: '0.375rem',
            background: '#E5E7EB',
            marginRight: '1rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <motion.div
                style={shimmerStyle}
                animate={{ transform: 'translateX(100%)' }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </div>
        <div style={{ flex: 1 }}>
            <div style={{
                height: '1rem',
                width: '60%',
                background: '#E5E7EB',
                borderRadius: '0.25rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <motion.div
                    style={shimmerStyle}
                    animate={{ transform: 'translateX(100%)' }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </div>
        </div>
    </div>
)

export const LoadingState = () => {
    return (
        <div style={{
            maxWidth: '56rem',
            margin: '0 auto',
            padding: '2rem 0'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <div style={{
                    width: '8rem',
                    height: '8rem',
                    borderRadius: '9999px',
                    background: '#E5E7EB',
                    marginRight: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        style={shimmerStyle}
                        animate={{ transform: 'translateX(100%)' }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </div>
                <div style={{
                    height: '2rem',
                    width: '200px',
                    background: '#E5E7EB',
                    borderRadius: '0.375rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <motion.div
                        style={shimmerStyle}
                        animate={{ transform: 'translateX(100%)' }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </div>
            </div>

            <div>
                {[...Array(3)].map((_, yearIndex) => (
                    <div key={yearIndex} style={{ marginBottom: '2rem' }}>
                        <div style={{
                            height: '1.5rem',
                            width: '100px',
                            background: '#E5E7EB',
                            borderRadius: '0.25rem',
                            marginBottom: '1rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                style={shimmerStyle}
                                animate={{ transform: 'translateX(100%)' }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                        {[...Array(3)].map((_, albumIndex) => (
                            <LoadingAlbum key={albumIndex} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
