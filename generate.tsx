import satori from 'satori';
import { writeFileSync } from 'fs';
import * as React from 'react';

const generate = async () => {
  console.log('Fetching fonts...');
  
  // Fetch fonts
  const fontRegular = await fetch('https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Regular.ttf').then(res => res.arrayBuffer());
  const fontBold = await fetch('https://github.com/googlefonts/roboto/raw/main/src/hinted/Roboto-Bold.ttf').then(res => res.arrayBuffer());

  console.log('Fetching GitHub stats...');
  let commits = 180;
  let contributions = 290;
  let stars = 12;

  if (process.env.GH_TOKEN) {
    try {
      const query = `
        query {
          user(login: "amandeepintl") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
              totalCommitContributions
            }
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
              nodes {
                stargazerCount
              }
            }
          }
        }
      `;
      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `bearer ${process.env.GH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      if (data.data?.user) {
        contributions = data.data.user.contributionsCollection.contributionCalendar.totalContributions;
        commits = data.data.user.contributionsCollection.totalCommitContributions;
        stars = data.data.user.repositories.nodes.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);
        console.log('Successfully fetched live stats!');
      }
    } catch (e) {
      console.error('Failed to fetch live stats, using fallbacks.', e);
    }
  } else {
    console.log('No GH_TOKEN provided, using fallback static data.');
  }

  console.log('Generating SVG...');

  const svg = await satori(
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: '#f8f9fa',
      color: '#212529',
      fontFamily: '"Roboto"',
      padding: '40px',
      gap: '24px',
    }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px',
        border: '1px solid #dee2e6',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: '#f1f3f5',
          borderRadius: '50%',
          opacity: 0.8
        }} />
        
        <span style={{ color: '#f59f00', fontWeight: 600, fontSize: '14px', letterSpacing: '1px' }}>SCHOLARSHIP PORTFOLIO • 2025</span>
        <h1 style={{ margin: '16px 0', fontSize: '48px', fontWeight: 600, color: '#101112' }}>Aman Deep</h1>
        <p style={{ margin: '0 0 24px 0', fontSize: '18px', color: '#495057', maxWidth: '600px', lineHeight: 1.5 }}>
          Self-taught developer passionate about logic-based problem solving, clean code, and AI-assisted technology. Building from fundamentals up.
        </p>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Open Source Contributor', 'Self-Directed Learner', 'Full-Stack Foundations', 'AI Enthusiast'].map(tag => (
            <div key={tag} style={{
              display: 'flex',
              padding: '6px 16px',
              borderRadius: '20px',
              border: '1px solid #f59f00',
              color: '#d9480f',
              backgroundColor: '#fff4e6',
              fontSize: '13px',
              fontWeight: 600
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#868e96', letterSpacing: '1px', marginTop: '24px', marginBottom: '8px', textTransform: 'uppercase' }}>Verified Github Activity</h2>

      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
        {[
          { value: contributions, label: 'Total contributions since Feb 2024' },
          { value: commits, label: 'Commits in the past year' },
          { value: stars, label: 'Stars earned from the community' }
        ].map(stat => (
          <div key={stat.label} style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}>
            <span style={{ fontSize: '36px', fontWeight: 600, color: '#f59f00', marginBottom: '8px' }}>{stat.value}</span>
            <span style={{ fontSize: '14px', color: '#495057' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#868e96', letterSpacing: '1px', marginTop: '24px', marginBottom: '8px', textTransform: 'uppercase' }}>Goals & Direction</h2>

      {/* Goals Row */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { title: 'Currently building:', desc: 'A set of logic-based applications — learning to design programs that solve real problems with clean, maintainable code.' },
          { title: 'Looking to collaborate:', desc: 'Open-source projects that sharpen problem-solving — I believe the best learning happens through building with others.' },
          { title: 'Actively studying:', desc: 'Programming fundamentals, algorithm efficiency, and exploring different tech stacks to build a broad engineering foundation.' }
        ].map(goal => (
          <div key={goal.title} style={{
            display: 'flex',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #dee2e6',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
          }}>
            <div style={{ position: 'absolute', left: 0, top: '20px', bottom: '20px', width: '4px', backgroundColor: '#f59f00', borderRadius: '0 4px 4px 0' }} />
            <div style={{ display: 'flex', marginLeft: '12px', fontSize: '15px' }}>
              <span style={{ fontWeight: 600, color: '#212529', marginRight: '6px' }}>{goal.title}</span>
              <span style={{ color: '#495057' }}>{goal.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#868e96', letterSpacing: '1px', marginTop: '24px', marginBottom: '8px', textTransform: 'uppercase' }}>What I Bring</h2>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}>
          <span style={{ fontSize: '24px', marginBottom: '16px' }}>🧠</span>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 12px 0' }}>Logical problem solving</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#495057', lineHeight: 1.5 }}>
            I enjoy breaking down complex challenges into clear, structured solutions — turning abstract ideas into working visual experiences.
          </p>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}>
          <span style={{ fontSize: '24px', marginBottom: '16px' }}>🚀</span>
          <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 12px 0' }}>Self-motivated growth</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#495057', lineHeight: 1.5 }}>
            290 contributions built independently, without formal coursework — driven by curiosity about AI-assisted coding and modern development.
          </p>
        </div>
      </div>

    </div>,
    {
      width: 900,
      height: 1250,
      fonts: [
        {
          name: 'Roboto',
          data: fontRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: fontBold,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  );

  writeFileSync('profile-light.svg', svg);
  console.log('Successfully generated profile-light.svg!');
};

generate().catch(console.error);
