import { AnimatePresence, motion } from 'framer-motion';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import '@/styles/globals.scss';

// import '@/styles/colors.scss';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      {/* <Header /> */}
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: 'easeOut',
          duration: 0.5,
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
};

export default MyApp;
