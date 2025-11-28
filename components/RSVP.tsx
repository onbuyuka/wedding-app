import React, { useState } from 'react';
import { saveRsvp } from '../services/rsvpService';
import { RsvpData } from '../types';
import { CONTENT } from '../constants';

interface RSVPProps {
  content: typeof CONTENT.en;
}

const RSVP: React.FC<RSVPProps> = ({ content }) => {
  const [formData, setFormData] = useState<Partial<RsvpData>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    attending: true,
    plusOne: false,
    plusOneName: '',
    dietaryRestrictions: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { rsvp } = content;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadio = (name: string, val: boolean) => {
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) return;

    setStatus('submitting');
    try {
      await saveRsvp(formData as Omit<RsvpData, 'id' | 'timestamp'>);
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        attending: true,
        plusOne: false,
        plusOneName: '',
        dietaryRestrictions: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className="scroll-mt-24 py-20 bg-rose-50 flex items-center justify-center">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg text-center">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-serif text-3xl mb-2 text-stone-800">{rsvp.success.title}</h3>
          <p className="text-stone-600">{rsvp.success.message}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-rose-500 hover:text-rose-700 font-semibold text-sm underline"
          >
            {rsvp.success.reset}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="scroll-mt-24 py-20 bg-rose-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl text-stone-800 mb-2">{rsvp.title}</h2>
            <p className="text-stone-500">{rsvp.deadline}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.firstName}</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName} 
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                  placeholder={rsvp.placeholders.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.lastName}</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                  placeholder={rsvp.placeholders.lastName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.email}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                  placeholder={rsvp.placeholders.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.phone}</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                  placeholder={rsvp.placeholders.phone}
                />
              </div>
            </div>

            <div className="border-t border-b border-stone-100 py-6 my-6">
              <label className="block text-sm font-medium text-stone-700 mb-3">{rsvp.fields.attending}</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attending" 
                    checked={formData.attending === true}
                    onChange={() => handleRadio('attending', true)}
                    className="text-rose-500 focus:ring-rose-400 w-5 h-5"
                  />
                  <span className="text-stone-700">{rsvp.fields.accept}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="attending" 
                    checked={formData.attending === false}
                    onChange={() => handleRadio('attending', false)}
                    className="text-rose-500 focus:ring-rose-400 w-5 h-5"
                  />
                  <span className="text-stone-700">{rsvp.fields.decline}</span>
                </label>
              </div>
            </div>

            {formData.attending && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <input 
                      type="checkbox"
                      id="plusOne"
                      checked={formData.plusOne}
                      onChange={(e) => setFormData(prev => ({...prev, plusOne: e.target.checked}))}
                      className="rounded text-rose-500 focus:ring-rose-400 w-5 h-5"
                    />
                    <label htmlFor="plusOne" className="text-sm font-medium text-stone-700 select-none">
                      {rsvp.fields.guest}
                    </label>
                  </div>
                  {formData.plusOne && (
                    <input 
                      type="text" 
                      name="plusOneName"
                      value={formData.plusOneName}
                      onChange={handleChange}
                      className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                      placeholder={rsvp.placeholders.guestName}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.diet}</label>
                  <input 
                    type="text" 
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleChange}
                    className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                    placeholder={rsvp.placeholders.diet}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{rsvp.fields.message}</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border-stone-300 shadow-sm focus:border-rose-400 focus:ring focus:ring-rose-200 p-3 bg-stone-50"
                placeholder={rsvp.placeholders.message}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-stone-800 text-white font-semibold py-4 rounded-md hover:bg-stone-900 transition-colors disabled:opacity-50"
            >
              {status === 'submitting' ? rsvp.fields.submitting : rsvp.fields.submit}
            </button>
            {status === 'error' && (
              <p className="text-red-500 text-center text-sm">{rsvp.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RSVP;
