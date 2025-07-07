import Image from 'next/image';
import Link from 'next/link';

export default function DynamicSection({ pageData, isChildPage }) {
  return (
    <section className='py-8 md:py-16 bg-white'>
      <div className='container mx-auto px-6 md:px-12 lg:px-20'>
        {isChildPage ? (
          // Child page: Show title and description only
          <div className='text-center'>
            <h2 className='text-3xl font-bold mb-8'>{pageData?.title}</h2>
            <p className='mt-4 text-gray-600'>
              {pageData?.subtitle ? pageData.subtitle : null}
            </p>

            <div
              className='mt-10 text-gray-600 text-justify break-words'
              dangerouslySetInnerHTML={{
                __html: pageData?.description,
              }}
            ></div>
          </div>
        ) : (
          // Parent page
          <>
            {pageData?.child?.length === 0 ? (
              // Parent page with no children: Show title, subtitle, and description
              <div className='text-center'>
                <h2 className='text-3xl font-bold mb-4'>{pageData?.title}</h2>
                <p className='mt-4 text-gray-600'>
                  {pageData?.subtitle ? pageData.subtitle : null}
                </p>
                <div
                  className='mt-10 text-gray-600 text-justify break-words'
                  dangerouslySetInnerHTML={{
                    __html: pageData?.description,
                  }}
                ></div>
              </div>
            ) : (
              // Parent page with children: Existing logic
              <>
                <div className='text-center mb-8 md:mb-12'>
                  <h2 className='text-3xl font-bold'>{pageData?.title}</h2>
                  <p className='mt-4 text-gray-600'>
                    {pageData?.subtitle ? pageData.subtitle : null}
                  </p>
                </div>
                {pageData?.child?.length === 1 && (
                  <>
                    {' '}
                    <div
                      className='my-10 text-gray-600 text-justify break-words'
                      dangerouslySetInnerHTML={{
                        __html: pageData?.description,
                      }}
                    ></div>
                    <div className='pattern md:py-20 py-10 mt-10 md:mt-20'>
                      <div className='container grid grid-cols-1 md:grid-cols-5 gap-20 items-center'>
                        {/* Text Content */}
                        <div className='col-span-5 md:col-span-2'>
                          <h3 className='text-2xl font-semibold text-gray-900'>
                            {pageData?.child[0].title}
                          </h3>
                          <div
                            className='mt-4 text-gray-600 text-justify break-words'
                            dangerouslySetInnerHTML={{
                              __html: pageData?.child[0].description,
                            }}
                          ></div>
                        </div>
                        {/* Image */}
                        <div className='relative col-span-5 md:col-span-3 order-first md:order-none'>
                          <div className='absolute -top-3 -left-3 w-[30%] h-[50%] border-t-[12px] border-l-[12px] border-yellow-800'></div>
                          <div className='relative z-10 shadow-lg overflow-hidden'>
                            <Image
                              src={
                                pageData?.child[0].image_path ||
                                '/placeholder.png'
                              }
                              alt={
                                pageData?.child[0].image_alt_text ||
                                'Section Image'
                              }
                              width={1000}
                              height={600}
                              className='border-8 shadow-xl w-full h-full'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/* Blog Grid Section */}
                {pageData?.child?.length > 1 && (
                  <>
                    <div
                      className='mt-10 text-gray-600 text-justify break-words'
                      dangerouslySetInnerHTML={{
                        __html: pageData?.description,
                      }}
                    ></div>
                    <section className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                      {pageData?.child?.map((blog, index) => (
                        <div
                          key={index}
                          className='bg-white shadow-lg overflow-hidden flex flex-col'
                        >
                          {/* Image */}
                          <div className='w-full h-60 relative'>
                            <img
                              src={blog.image_path || '/placeholder.png'}
                              alt={blog.image_alt_text || blog.title}
                              className='object-cover w-full h-full'
                            />
                          </div>
                          {/* Content */}
                          <div className='p-4 flex flex-col flex-grow'>
                            {/* Title */}
                            <Link href={`/${pageData?.page_url}/${blog.slug}`}>
                              <h3 className='text-xl text-center font-semibold pb-4 text-yellow-800'>
                                {blog.title}
                              </h3>
                            </Link>
                            {/* Sub-title */}
                            <p className='text-gray-600 text-md py-1 mb-3 text-center mt-1 line-clamp-3'>
                              {blog.subtitle}
                            </p>
                            {/* Content Button */}
                            <div className='flex justify-center items-center'>
                              <Link
                                href={`/${pageData?.page_url}/${blog.slug}`}
                                passHref
                                className='mt-4 bg-transparent border border-yellow-700 text-center text-yellow-700 py-2 px-6 rounded-xs hover:bg-yellow-800 hover:text-white transition self-start'
                              >
                                Read More...
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </section>
                  </>
                )}
                {/* {pageData?.child?.length === 1 && (
                  <div
                    className='mt-10 text-gray-600 text-justify break-words'
                    dangerouslySetInnerHTML={{
                      __html: pageData?.description,
                    }}
                  ></div>
                )} */}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
