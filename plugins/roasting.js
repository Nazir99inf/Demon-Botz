//© AkiraaBot 2023-2024
// • Credits : wa.me/6287869975929 [ Bang syaii ]
// • Owner: 6287869975929,6283831945469

/*
• untuk siapa pun yang ketahuan menjual script ini tanpa sepengetahuan developer mohon untuk dilaporkan !
*/

const postData = async (username) => {
  try {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    const userData = userResponse.data;
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated`,
    );
    const repos = reposResponse.data;

    const formattedRepos = repos.map((repo) => ({
      name: repo.name,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      open_issues_count: repo.open_issues_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      html_url: repo.html_url,
    }));

    const payload = {
      jsonData: JSON.stringify({
        name: userData.name || null,
        bio: userData.bio || null,
        company: userData.company || null,
        location: userData.location || null,
        followers: userData.followers,
        following: userData.following,
        public_repos: userData.public_repos,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        repositories: formattedRepos,
      }),
      README: null,
      model: "llama",
      language: "indonesia",
      apiKey: "",
    };
    const postResponse = await axios.post(
      `https://lelowgdwvvozdsjiixps.vercel.app/roasting?username=${username}`,
      payload,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://roastgithub.vercel.app/",
        },
      },
    );

    return "*[ Github ]* " + postResponse.data.roasting;
  } catch (error) {
    try {
      const apiURL = `https://akhirpetang.vercel.app/api/ig?username=${encodeURIComponent(username)}`;
      const response = await fetch(apiURL, {
        headers: {
          Authorization: "Bearer akhirpetang-09853773678853385327Ab63",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(
          `Akun Instagram dengan username ${username} tidak ditemukan.`,
        );
      }

      const roastingApiURL = `https://roastiges.vercel.app/api/roasting?username=${encodeURIComponent(data.nama_lengkap)}&biodata=${encodeURIComponent(JSON.stringify(data))}&language=indonesia`;
      const roastingResponse = await fetch(roastingApiURL, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (!roastingResponse.ok) {
        throw new Error(`HTTP error! Status: ${roastingResponse.status}`);
      }
      const roastingData = await roastingResponse.json();
      const roastingText = roastingData.roasting || "Tidak ada data roasting.";
      return "*[ Instagram  ]* " + roastingText;
    } catch (e) {
      try {
        const profileUrl = `https://tiktok-roasting.vercel.app/api/tiktok-profile?username=${username}`;
        const roastUrl = `https://tiktok-roasting.vercel.app/api/generate-roast`;
        const profileResponse = await fetch(profileUrl);
        if (!profileResponse.ok) {
          throw new Error(`HTTP error! Status: ${profileResponse.status}`);
        }
        const profileData = await profileResponse.json();
        if (!profileData || profileData.error) {
          throw new Error("Akun tidak ditemukan.");
        }
        const body = {
          username: profileData.username,
          profile: profileData,
          language: "indonesian",
        };
        const roastResponse = await fetch(roastUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (!roastResponse.ok) {
          throw new Error(`HTTP error! Status: ${roastResponse.status}`);
        }
        const roastData = await roastResponse.json();
        const roastingText = roastData.roasting || "Tidak ada data roasting.";
        return "*[ Tiktok  ]* " + roastingText;
      } catch (e) {
        try {
          const url = `https://threads-roaster.vercel.app/?u=${encodeURIComponent(username)}&l=id`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const html = await response.text();
          const $ = cheerio.load(html);
          const result = {};
          result.username = $(".card-title").text().trim();
          if (!result.username) {
            throw new Error("Akun pengguna tidak ditemukan");
          }
          result.roasting = $(".card-body p").eq(1).text().trim();
          result.postLink =
            $(".card-actions a").attr("href") || "Tidak ada tautan";
          return (
            "*[ Treads ]* " + result.roasting ||
            "Tidak ada yang bisa di roasting"
          );
        } catch (e) {
          return "Akun ini Tidak bisa diroasting jir";
        }
      }
    }
  }
};

module.exports = {
  help: ["roasting"].map((a) => a + "*[Username sosmed]*"),
  tags: ["fun"],
  command: ["roasting"],
  code: async (
    m,
    {
      conn,
      usedPrefix,
      command,
      text,
      isOwner,
      isAdmin,
      isBotAdmin,
      isPrems,
      chatUpdate,
    },
  ) => {
    if (!text)
      throw `*• Example :* ${usedPrefix + command} *[username sosmed]*`;
    m.reply(wait);
    let data = await postData(text);
    m.reply(data);
  },
};
