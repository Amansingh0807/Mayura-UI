"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, User, MessageSquare, AlertCircle, CheckCircle, X, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  // Initialize EmailJS when component mounts
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    console.log('🔑 Initializing EmailJS with public key:', publicKey);
    
    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log('✅ EmailJS initialized successfully');
      } catch (error) {
        console.error('❌ EmailJS initialization failed:', error);
      }
    } else {
      console.error('❌ Public key not found in environment variables');
    }
  }, []);

  // Shows alert message for form submission feedback
  const toggleAlert = (message: string, type: string) => {
    setAlertInfo({ display: true, message, type });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data: FormData) => {
    console.log('🚀 Form submission started...');
    
    // Destructure data object
    const { name, email, subject, message } = data;
    
    // Check if environment variables are loaded
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    console.log('🔍 Environment check:', {
      serviceId: serviceId || 'MISSING ❌',
      templateId: templateId || 'MISSING ❌', 
      publicKey: publicKey || 'MISSING ❌'
    });

    if (!serviceId || !templateId || !publicKey) {
      const missingVars = [];
      if (!serviceId) missingVars.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID');
      if (!templateId) missingVars.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID');
      if (!publicKey) missingVars.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY');
      
      toggleAlert(`Missing environment variables: ${missingVars.join(', ')}. Please restart your development server.`, 'danger');
      return;
    }

    try {
      // Disable form while processing submission
      setDisabled(true);
      console.log('🔄 Processing form submission...');

      // Re-initialize EmailJS with current public key (in case of key change)
      emailjs.init(publicKey);
      console.log('🔑 Re-initialized EmailJS with key:', publicKey);

      // Define template params
      const templateParams = {
        name,
        email,
        subject,
        message,
        to_name: 'Mayura UI Team',
        from_name: name,
        reply_to: email,
      };

      console.log('📧 Sending email with params:', templateParams);
      console.log('🔧 Using service:', serviceId, 'template:', templateId);

      // Use emailjs to send email
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('✅ EmailJS Result:', result);
      
      if (result.status === 200) {
        toggleAlert('Form submission was successful! Thank you for your message.', 'success');
        // Reset form on successful submission
        reset();
      } else {
        toggleAlert(`Unexpected response status: ${result.status}`, 'danger');
      }
    } catch (error: unknown) {
      console.error('❌ EmailJS Error Details:', error);
      
      let errorMessage = 'Something went wrong while sending your message.';
      
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      } else if (typeof error === 'object' && error !== null && 'text' in error) {
        errorMessage = `EmailJS Error: ${(error as { text: string }).text}`;
        console.error('EmailJS error text:', (error as { text: string }).text);
      }
      
      // Display error alert
      toggleAlert(errorMessage, 'danger');
    } finally {
      // Re-enable form submission
      setDisabled(false);
      console.log('🏁 Form submission completed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 w-12 h-12 bg-gradient-to-br from-[#00aeaf]/10 to-[#0c4bb2]/10 rounded-full animate-bounce-slow opacity-60">
          <Mail className="w-6 h-6 text-[#00aeaf] m-3" />
        </div>
        <div className="absolute bottom-40 right-10 w-10 h-10 bg-gradient-to-br from-[#0c4bb2]/10 to-[#008c9d]/10 rounded-lg animate-bounce-slow opacity-60" style={{ animationDelay: '2s' }}>
          <MessageSquare className="w-5 h-5 text-[#0c4bb2] m-2.5" />
        </div>
        <div className="absolute top-1/3 right-20 w-8 h-8 bg-gradient-to-br from-[#008c9d]/10 to-[#00aeaf]/10 rounded-full animate-bounce-slow opacity-60" style={{ animationDelay: '1s' }}>
          <Phone className="w-4 h-4 text-[#008c9d] m-2" />
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#00aeaf]/5 to-[#0c4bb2]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-0 w-48 h-48 bg-gradient-to-br from-[#008c9d]/5 to-[#00aeaf]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-[#0c4bb2]/3 to-[#008c9d]/3 rounded-full blur-2xl" />
      </div>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-left">
                <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-[#00aeaf]/10 to-[#0c4bb2]/10 border-[#00aeaf]/20 text-[#0c4bb2] dark:text-[#00aeaf]">
                  <Mail className="h-3 w-3 mr-1" />
                  Get In Touch
                </Badge>
                
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0c4bb2] via-[#00aeaf] to-[#008c9d] bg-clip-text text-transparent leading-tight">
                  Contact Me
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  If you have any questions or would like to get in touch, feel free to reach out! I&apos;d love to hear from you.
                </p>
              </div>

              {/* Contact Information Cards */}
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-[#00aeaf]/20 hover:border-[#00aeaf]/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#00aeaf]/10 to-[#0c4bb2]/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-[#00aeaf]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                        <p className="text-gray-600 dark:text-gray-300">contact.mayuraui@gmail.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-[#00aeaf]/20 hover:border-[#00aeaf]/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0c4bb2]/10 to-[#008c9d]/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-[#0c4bb2]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Connect on X</h3>
                        <p className="text-gray-600 dark:text-gray-300">@mayuraui</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-[#00aeaf]/20 hover:border-[#00aeaf]/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#008c9d]/10 to-[#00aeaf]/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-[#008c9d]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Location</h3>
                        <p className="text-gray-600 dark:text-gray-300">New Delhi, India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:mt-[120px]">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-[#00aeaf]/20 shadow-2xl">
                <CardContent className="p-8">
                  <div className="mb-15">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Send Message</h2>
                    <p className="text-gray-600 dark:text-gray-300">Fill out the form below and I&apos;ll get back to you as soon as possible.</p>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00aeaf] h-5 w-5" />
                          <Input
                            type="text"
                            placeholder="Your Name"
                            className="pl-10 h-12 border-[#00aeaf]/20 focus:border-[#00aeaf] focus:ring-[#00aeaf]/20"
                            {...register('name', {
                              required: {
                                value: true,
                                message: 'Please enter your name',
                              },
                              maxLength: {
                                value: 30,
                                message: 'Please use 30 characters or less',
                              },
                            })}
                          />
                        </div>
                        {errors.name && (
                          <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.name.message}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00aeaf] h-5 w-5" />
                          <Input
                            type="email"
                            placeholder="Your Email"
                            className="pl-10 h-12 border-[#00aeaf]/20 focus:border-[#00aeaf] focus:ring-[#00aeaf]/20"
                            {...register('email', {
                              required: true,
                              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            })}
                          />
                        </div>
                        {errors.email && (
                          <div className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            Please enter a valid email address
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00aeaf] h-5 w-5" />
                        <Input
                          type="text"
                          placeholder="Subject"
                          className="pl-10 h-12 border-[#00aeaf]/20 focus:border-[#00aeaf] focus:ring-[#00aeaf]/20"
                          {...register('subject', {
                            required: {
                              value: true,
                              message: 'Please enter a subject',
                            },
                            maxLength: {
                              value: 75,
                              message: 'Subject cannot exceed 75 characters',
                            },
                          })}
                        />
                      </div>
                      {errors.subject && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.subject.message}
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                      <Textarea
                        rows={6}
                        placeholder="Your Message"
                        className="border-[#00aeaf]/20 focus:border-[#00aeaf] focus:ring-[#00aeaf]/20 resize-none"
                        {...register('message', {
                          required: true,
                          validate: value => {
                            const wordCount = value.trim().split(/\s+/).length;
                            return wordCount <= 50 || "Message cannot exceed 50 words";
                          }
                        })}
                      />
                      {errors.message && (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.message?.message || "Please enter a message"}
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <Button
                          type="submit"
                          disabled={disabled}
                          className="relative bg-gradient-to-r from-[#00aeaf] to-[#0c4bb2] hover:from-[#0c4bb2] hover:to-[#00aeaf] text-white px-8 py-3 text-lg font-semibold group hover:scale-105 transition-all duration-300 w-full"
                        >
                          {disabled ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Alert Message */}
              {alertInfo.display && (
                <div className={`mt-6 p-4 rounded-lg border ${
                  alertInfo.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
                    : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
                } animate-in slide-in-from-top-2 duration-300`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {alertInfo.type === 'success' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <AlertCircle className="h-5 w-5" />
                      )}
                      {alertInfo.message}
                    </div>
                    <button
                      onClick={() => setAlertInfo({ display: false, message: '', type: '' })}
                      className="text-current hover:opacity-70 transition-opacity"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
