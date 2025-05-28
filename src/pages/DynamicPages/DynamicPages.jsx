import React, { useState, useEffect } from "react";
import Spinner from "../../Shared/Loader/Spinner";

const DynamicPages = ({ data, loading }) => {
  return (
    <main className="container py-5">
      {loading ? (
        <Spinner />
      ) : (
        <section>
          <h1>{data?.title}</h1>

          <p
            dangerouslySetInnerHTML={{
              __html: data?.content,
            }}
          />
        </section>
      )}
    </main>
  );
};

export default DynamicPages;
