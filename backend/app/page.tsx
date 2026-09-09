'use client'

import React, { useState } from 'react'
import activityRulesData from './activity-rules.json'

export default function Home() {
  const [phase, setPhase] = useState<'splash' | 'onboarding' | 'main'>('splash')
  const [currentTab, setCurrentTab] = useState<'home' | 'alerts' | 'profile'>('home')
  const [userActivities, setUserActivities] = useState<string[]>(['surfing', 'cycling'])
  const [selectedHourlyIndex, setSelectedHourlyIndex] = useState(3) // 9:00
  const [selectedDayIndex, setSelectedDayIndex] = useState(0) // MON

  const hourlyPoints = [
    { time: '0:00', temp: 16, condition: 'Clear', icon: '🌙' },
    { time: '3:00', temp: 15, condition: 'Cool', icon: '✨' },
    { time: '6:00', temp: 17, condition: 'Dawn', icon: '🌤️' },
    { time: '9:00', temp: 22, condition: 'Cloudy', icon: '⛅' },
    { time: '12:00', temp: 25, condition: 'Sunny', icon: '☀️' },
    { time: '15:00', temp: 24, condition: 'Pleasant', icon: '🌤️' },
    { time: '18:00', temp: 21, condition: 'Dusk', icon: '🌇' },
    { time: '21:00', temp: 18, condition: 'Clear Night', icon: '🌙' },
  ]

  const sevenDays = [
    { day: 'MON', icon: '☀️', high: 22, low: 16 },
    { day: 'TUE', icon: '⛅', high: 20, low: 15 },
    { day: 'WED', icon: '🌦️', high: 21, low: 17 },
    { day: 'THU', icon: '🌧️', high: 18, low: 15 },
    { day: 'FRI', icon: '⛅', high: 19, low: 14 },
    { day: 'SAT', icon: '☀️', high: 23, low: 17 },
    { day: 'SUN', icon: '🌤️', high: 24, low: 18 },
  ]

  // Find suggestion based on user's primary activity
  const primaryActivity = userActivities[0] || 'surfing'
  const matchingRule = activityRulesData.rules.find((r) => r.activityId === primaryActivity) || activityRulesData.rules[0]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-600 via-purple-500 to-indigo-400 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-purple-300">
      {/* Decorative Ambient Glass Lights */}
      <div className="fixed top-12 left-12 w-72 h-72 rounded-full bg-purple-400/40 blur-3xl pointer-events-none" />
      <div className="fixed bottom-12 right-12 w-96 h-96 rounded-full bg-indigo-600/30 blur-3xl pointer-events-none" />

      {/* Main Glass Mobile Canvas */}
      <div className="relative w-full max-w-[390px] min-h-[800px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[44px] shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
        
        {/* PHASE 1: SPLASH / AUTH */}
        {phase === 'splash' && (
          <div className="flex-1 flex flex-col items-center justify-between py-10">
            <div className="w-full flex justify-center mt-10">
              {/* 3D Puffy Cloud & Sun */}
              <div className="relative w-44 h-32 flex items-center justify-center">
                <div className="absolute top-0 right-6 w-16 h-16 rounded-full bg-amber-400 shadow-[0_0_25px_rgba(250,204,21,0.8)] border-2 border-yellow-200" />
                <div className="relative z-10 w-36 h-20 bg-white/95 rounded-full shadow-lg border border-white flex items-center justify-center mt-6">
                  <div className="absolute -top-4 left-6 w-16 h-16 bg-white rounded-full" />
                  <div className="absolute -top-1 right-8 w-12 h-12 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-center my-8">
              <h1 className="text-4xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Weather<br />Forecasts
              </h1>
            </div>

            <div className="w-full flex flex-col items-center gap-4">
              <button
                onClick={() => setPhase('onboarding')}
                className="w-full max-w-[240px] h-14 rounded-full bg-violet-900 text-white font-bold text-lg shadow-xl hover:bg-violet-950 transition-transform active:scale-95"
              >
                Get Start
              </button>
              <button
                onClick={() => setPhase('onboarding')}
                className="text-white/90 text-sm font-semibold hover:underline"
              >
                Create an account
              </button>
            </div>
          </div>
        )}

        {/* PHASE 2: ONBOARDING */}
        {phase === 'onboarding' && (
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <div className="text-center mb-6">
                <span className="text-xs font-extrabold uppercase bg-purple-900/10 text-purple-900 px-3 py-1 rounded-full">
                  Step 2 of 2 • Preferences
                </span>
                <h2 className="text-2xl font-black text-purple-950 mt-3">
                  What activities do you do?
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  Select your outdoor passions to receive live weather-activity intelligence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
                {activityRulesData.activities.map((act) => {
                  const isSelected = userActivities.includes(act.id)
                  return (
                    <button
                      key={act.id}
                      onClick={() => {
                        setUserActivities((prev) =>
                          prev.includes(act.id) ? prev.filter((i) => i !== act.id) : [...prev, act.id]
                        )
                      }}
                      className={`p-3.5 rounded-2xl flex flex-col items-center justify-center transition-all border ${
                        isSelected
                          ? 'bg-purple-900 text-white border-purple-800 shadow-md'
                          : 'bg-white/60 text-purple-950 border-white/80 hover:bg-white/80'
                      }`}
                    >
                      <span className="text-2xl mb-1">{act.icon}</span>
                      <span className="text-xs font-bold">{act.name}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-purple-200' : 'text-gray-500'}`}>
                        {act.category}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-900/10 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-purple-900">
                {userActivities.length} activities selected
              </span>
              <button
                onClick={() => setPhase('main')}
                className="w-full h-12 rounded-full bg-violet-900 text-white font-bold text-sm shadow-lg hover:bg-violet-950 transition-transform active:scale-95"
              >
                Go to My Weather →
              </button>
            </div>
          </div>
        )}

        {/* PHASE 3: MAIN TABS */}
        {phase === 'main' && (
          <div className="flex-1 flex flex-col justify-between pb-16">
            {currentTab === 'home' && (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-full bg-white/50 flex flex-col items-center justify-center gap-1">
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                    <div className="w-1 h-1 bg-gray-600 rounded-full" />
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 font-extrabold text-purple-950 text-sm">
                      <span>📍</span> Location
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">Monday, 1 January 9:00</div>
                  </div>

                  <button className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-purple-900 font-bold text-lg">
                    +
                  </button>
                </div>

                {/* Hero Temp & Artwork */}
                <div className="flex items-center justify-between px-2">
                  <div>
                    <div className="text-6xl font-black text-purple-950 tracking-tighter">22°</div>
                    <div className="text-base font-bold text-purple-800">Cloudy</div>
                  </div>

                  <div className="relative w-28 h-20 flex items-center justify-center">
                    <div className="absolute -top-1 right-2 w-10 h-10 rounded-full bg-amber-400 shadow-md border-2 border-yellow-200" />
                    <div className="relative z-10 w-24 h-14 bg-white/95 rounded-full shadow border border-white flex items-center justify-center mt-3">
                      <div className="absolute -top-2 left-4 w-10 h-10 bg-white rounded-full" />
                      <div className="absolute -top-1 right-4 w-8 h-8 bg-white rounded-full" />
                    </div>
                  </div>
                </div>

                {/* 3 Metrics */}
                <div className="bg-white/60 rounded-2xl p-3 flex items-center justify-around border border-white/80 shadow-sm text-center">
                  <div>
                    <span className="text-xs">☔</span>
                    <div className="text-xs font-black text-purple-950">30%</div>
                    <div className="text-[9px] text-gray-500">Precipitation</div>
                  </div>
                  <div className="w-px h-6 bg-purple-200" />
                  <div>
                    <span className="text-xs">💧</span>
                    <div className="text-xs font-black text-purple-950">20%</div>
                    <div className="text-[9px] text-gray-500">Humidity</div>
                  </div>
                  <div className="w-px h-6 bg-purple-200" />
                  <div>
                    <span className="text-xs">💨</span>
                    <div className="text-xs font-black text-purple-950">12 km/h</div>
                    <div className="text-[9px] text-gray-500">Wind speed</div>
                  </div>
                </div>

                {/* Hourly Curve */}
                <div className="space-y-1">
                  <div className="h-10 relative flex items-center">
                    <div className="absolute left-2 right-2 h-0.5 bg-purple-600" />
                    <div className="w-full flex justify-between px-2 relative z-10">
                      {hourlyPoints.map((pt, i) => (
                        <button
                          key={pt.time}
                          onClick={() => setSelectedHourlyIndex(i)}
                          className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
                            i === selectedHourlyIndex
                              ? 'bg-purple-900 ring-4 ring-purple-400/40 scale-125'
                              : 'bg-purple-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between px-1 text-[9px] font-semibold text-gray-600">
                    {hourlyPoints.map((pt, i) => (
                      <span key={pt.time} className={i === selectedHourlyIndex ? 'text-purple-900 font-extrabold' : ''}>
                        {pt.time}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dynamic Activity Suggestion Card (Matching User Request) */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3.5 border border-purple-200 shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase text-purple-900 flex items-center gap-1">
                      ⚡ Activity Suggestion
                    </span>
                    <span className="text-[10px] font-extrabold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      94% Match
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-purple-950">
                    {matchingRule.title}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {matchingRule.subtitle}
                  </div>
                </div>

                {/* 7-Day Forecast */}
                <div>
                  <div className="text-[11px] font-bold text-gray-600 mb-2">7-Day Forecasts</div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {sevenDays.map((d, idx) => (
                      <button
                        key={d.day}
                        onClick={() => setSelectedDayIndex(idx)}
                        className={`w-14 py-3 rounded-2xl flex flex-col items-center justify-between transition-all border ${
                          idx === selectedDayIndex
                            ? 'bg-purple-900 text-white border-purple-800 shadow-md'
                            : 'bg-white/45 text-purple-950 border-white/70'
                        }`}
                      >
                        <span className="text-[10px] font-extrabold">{d.day}</span>
                        {idx === selectedDayIndex ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 my-1" />
                        ) : (
                          <span className="text-sm my-0.5">{d.icon}</span>
                        )}
                        <span className="text-xs font-black">{d.high}°</span>
                        <span className={`text-[10px] ${idx === selectedDayIndex ? 'text-purple-200' : 'text-gray-500'}`}>
                          {d.low}°
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'alerts' && (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-black text-purple-950">Weather Alerts & Radar</h3>
                  <p className="text-xs text-gray-600">Hourly activity feasibility windows</p>
                </div>

                <div className="bg-amber-100/90 rounded-2xl p-3 border border-amber-200 flex gap-2 items-center">
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="text-xs font-bold text-amber-900">Offshore Breeze Active</div>
                    <div className="text-[10px] text-amber-800">Ideal for Surfing & Sailing until 2 PM.</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {userActivities.map((actId) => {
                    const meta = activityRulesData.activities.find((a) => a.id === actId)
                    if (!meta) return null
                    return (
                      <div key={actId} className="bg-white/80 rounded-2xl p-3 border border-purple-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{meta.icon}</span>
                          <div>
                            <div className="text-xs font-bold text-purple-950">{meta.name}</div>
                            <div className="text-[10px] text-gray-500">Best: 8:30 AM - 11:30 AM</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                          Prime 94%
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {currentTab === 'profile' && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-purple-900 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
                    A
                  </div>
                  <h3 className="text-base font-black text-purple-950 mt-2">Alex River</h3>
                  <p className="text-xs text-gray-600">alex.river@example.com</p>
                </div>

                <div className="bg-white/70 rounded-2xl p-3 border border-white/80">
                  <div className="text-xs font-bold text-purple-950 mb-2">Selected Passions</div>
                  <div className="flex flex-wrap gap-1.5">
                    {userActivities.map((id) => {
                      const act = activityRulesData.activities.find((a) => a.id === id)
                      return (
                        <span key={id} className="text-[11px] font-semibold bg-purple-100 text-purple-900 px-2.5 py-1 rounded-xl">
                          {act?.icon} {act?.name}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setPhase('onboarding')}
                  className="w-full py-2.5 rounded-xl bg-white/80 border border-purple-200 text-xs font-bold text-purple-900"
                >
                  Edit Activities
                </button>
                <button
                  onClick={() => setPhase('splash')}
                  className="w-full py-2.5 rounded-xl bg-red-100 text-xs font-bold text-red-700"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}

        {/* FLOATING ICON-ONLY BOTTOM BAR (Requirement: only icon not written) */}
        {phase === 'main' && (
          <div className="absolute bottom-4 left-6 right-6 h-14 bg-white/80 backdrop-blur-lg rounded-full border border-white/90 shadow-xl flex items-center justify-around px-4">
            <button
              onClick={() => setCurrentTab('home')}
              className={`p-2.5 rounded-full transition-all ${
                currentTab === 'home' ? 'bg-purple-900/15 text-purple-900 scale-110' : 'text-gray-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'home' ? 2.5 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button
              onClick={() => setCurrentTab('alerts')}
              className={`p-2.5 rounded-full relative transition-all ${
                currentTab === 'alerts' ? 'bg-purple-900/15 text-purple-900 scale-110' : 'text-gray-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'alerts' ? 2.5 : 2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            <button
              onClick={() => setCurrentTab('profile')}
              className={`p-2.5 rounded-full transition-all ${
                currentTab === 'profile' ? 'bg-purple-900/15 text-purple-900 scale-110' : 'text-gray-500'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentTab === 'profile' ? 2.5 : 2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
