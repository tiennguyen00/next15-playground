import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY);
  console.log(JSON.stringify(posts));

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup, Connect with entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Notices in Virtual
        </p>
        <SearchForm query={query as string} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : "All startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
