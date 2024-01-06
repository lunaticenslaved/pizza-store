'use client';

import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';

export interface Message {
  type: 'success' | 'error';
  message: string;
}

interface AuthCardProps extends PropsWithChildren {
  title: string;
  redirectText: string;
  redirectLinkText: string;
  redirectLink: string;
  message?: Message;
}

export function AuthCard({
  children,
  title,
  redirectText,
  redirectLinkText,
  redirectLink,
}: AuthCardProps) {
  return (
    <motion.section
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 20 }}
      className="p-12 shadow-xl rounded-xl min-w-[500px] bg-white">
      <h2 className="text-2xl font-bold mb-10 text-center">{title}</h2>

      {children}

      <p className="text-center mt-4">
        {redirectText}
        <Link
          href={redirectLink}
          className="ml-2 text-orange-500 font-semibold hover:text-orange-600">
          {redirectLinkText}
        </Link>
      </p>
    </motion.section>
  );
}
