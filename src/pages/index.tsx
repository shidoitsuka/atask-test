/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { ChevronDown, ChevronUp, Star } from 'react-feather';

import { getUserRepos, searchUser } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import RepoSkeleton from '@/components/loader/RepoSkeleton';

import { User, UserRepo } from '@/models/api';

type Users = User & {
  isShow?: boolean;
  repos?: UserRepo[];
  isLoading?: boolean;
};

const HomePage: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [users, setUsers] = React.useState<Users[]>([]);
  const [username, setUsername] = React.useState('');

  const startSearch = () => {
    if (!username) {
      setUsers([]);
      return;
    }
    setLoading(true);
    searchUser({ username })
      .then((response) => {
        setUsers(response.items);
      })
      .finally(() => setLoading(false));
  };

  const showUserRepo = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index] = {
      ...updatedUsers[index],
      isShow: !updatedUsers[index].isShow,
      isLoading: !updatedUsers[index].isShow,
    };
    setUsers(updatedUsers);
    updatedUsers[index].isShow &&
      getUserRepos({ username: updatedUsers[index].login }).then((response) => {
        const newUsers = [...updatedUsers];
        newUsers[index] = {
          ...newUsers[index],
          repos: response,
          isLoading: false,
        };
        setUsers(newUsers);
      });
  };

  return (
    <Layout>
      <main>
        <section className="bg-white">
          <div className="layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center">
            <div className="flex w-96">
              <input
                autoFocus
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-r-0 px-4 py-2"
                onKeyDown={(e) => e.key === 'Enter' && startSearch()}
              />
              <button
                className="border-primary-500 text-primary-500 hover:bg-primary-500 border px-4 py-2 text-sm duration-300 hover:text-white"
                onClick={startSearch}
              >
                Search
              </button>
            </div>
            <div className="mt-2 h-[80vh] w-96 overflow-y-scroll border bg-slate-200 px-4 py-2">
              {loading ? (
                <div>
                  <img
                    className="mx-auto"
                    src="/images/loading.gif"
                    alt="Loading..."
                  />
                  <h3>Loading...</h3>
                </div>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <motion.div
                    className="cursor-pointer"
                    layout
                    key={user.id}
                    onClick={() => showUserRepo(index)}
                  >
                    <motion.div
                      layout
                      className={`relative z-10 bg-gray-50 p-2 ${
                        !user.isShow && 'mb-2'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img
                          className="h-24 w-24"
                          src={user.avatar_url}
                          alt={`${user.login}'s avatar.`}
                        />
                        <div className="text-left">
                          <h6 className="font-semibold">{user.login}</h6>
                          <p className="text-sm">Account type : {user.type}</p>
                        </div>
                        <div className="ml-auto mt-auto cursor-pointer">
                          {user.isShow ? <ChevronUp /> : <ChevronDown />}
                        </div>
                      </div>
                    </motion.div>
                    {user.isShow && (
                      <AnimatePresence>
                        <motion.div
                          layout="position"
                          style={{ transformOrigin: 'top' }}
                          transition={{ duration: 0.3 }}
                          initial={{ rotateX: '90deg' }}
                          animate={{ rotateX: '0deg' }}
                          exit={{ rotateX: '90deg' }}
                          className="relative z-0 mb-3 h-64 w-full overflow-y-scroll bg-slate-300 p-2 text-left"
                        >
                          {user.isLoading ? (
                            <RepoSkeleton />
                          ) : user.repos && !user.repos.length ? (
                            <div className="mt-6 text-center">
                              <img
                                className="mx-auto h-36 w-36"
                                src="/images/no-repo.png"
                              />
                              <h4 className="font-bold">
                                This user has no repository to show.
                              </h4>
                            </div>
                          ) : (
                            user.repos?.map((repo) => (
                              <div
                                className="mb-2 bg-slate-500 p-2 text-white"
                                key={repo.id}
                              >
                                <div>
                                  <h6 className="flex items-center justify-between font-semibold">
                                    <span>{repo.name}</span>
                                    <span className="flex gap-1 text-xs">
                                      {repo.stargazers_count} <Star size={16} />
                                    </span>
                                  </h6>
                                  <p className="text-sm">{repo.description}</p>
                                </div>
                              </div>
                            ))
                          )}
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </motion.div>
                ))
              ) : (
                <div>
                  <img src="/images/octo.png" alt="Hi" />
                  <h3>Start your search</h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
